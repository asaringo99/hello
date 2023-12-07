# はじめに
今回は、docker container内でNamespaceを作成し実験を行います。

## 目的
LinuxのNamespaceの概念とその実装を具体的に理解し、実験を通じてその知識を深めることを目的とします。

## Namespaceとは
NamespaceはOSのリソースを隔離するための機能です。
Linuxでは、現在8種類のNamespaceが利用できます。
それぞれの　Namespaceと役割を以下にざっと書きます。

- PID Namespace
    - 各コンテナは独自のプロセスIDを持ち、他のコンテナのプロセスに影響を与えません。
- Mount Namespace
    - 異なるコンテナはそれぞれのファイルシステムを持ちます。
    - 他のコンテナのファイルシステムに影響を与えません。
- Network Namespace
    - 各コンテナは独自のネットワークスタックを持ちます。
    - 他のコンテナやホストから独立しています。
- Cgroup Namespace
    - 各コンテナは、他のコンテナのリソース使用量や制限に影響されません。
    - 自分のリソースを管理します。
- User Namespace
    - コンテナ内でのrootユーザーが、コンテナ外（ホスト）では非特権ユーザーとして扱われます。
- IPC Namespace
    - コンテナ内のプロセスは、他のコンテナのプロセスとメッセージを共有しません。
- Time Namespace
    - コンテナはそれぞれ独自のシステム時刻を持ち、他のコンテナやホストの時刻に影響を与えません。
- Uts Namespace
    - 各コンテナは独自のホスト名を持ち、他のコンテナやホストのホスト名に影響を与えません。

というような感じです。これらについての実験を以下でおこなっていき、理解を深めます。
今回はPID Namespaceについて実験します。

## 前提知識
今回扱うコマンドやdockerなどの知識は基本的なものばかりですが、念の為説明します。
分かる方は飛ばして問題ありません。

### Docker
Docker社が開発してるすごいやつです。サンドボックス環境を作る仕組みです。
基本的にLinux上でコンテナを作成しますが、現在はDockerDesktopというすごいやつを使ってMacOSやWindowsでも利用できます。
サーバー仮想化（VM）と勘違いされがちですが、異なった技術です。

### コマンド
今回必要なコマンドについてです。念の為説明しますが、分かる方は飛ばしてください。

#### docker
docker cliを利用してイメージをビルドしたり、コンテナを起動します。
例えば以下のようなコマンドをよく使います。
```terminal
$ docker build -t {任意のコンテナ名}
$ docker run --rm --init -it {作ったコンテナの名前} {コンテナ起動時に実行するコマンド}
$ docker exec -it {起動しているコンテナのID} {コンテナで実行したいコマンド}
```

#### mount
`mount`コマンドは以下の通りにコマンドを打ち込みます。
```terminal
$ mount -t {ファイルシステムのタイプ} {デバイス・パーティション} {マウントポイント}
```
例えば、以下のコマンドが考えられます。
```terminal
$ mount -t ext4 /dev/sdb5 /mnt/mountpoint
```
これは、**パーティションが`/dev/sdb5`というものを`/mnt/mountpoint`という所で扱えるようになる。そして、`etx4`というファイルシステムがアタッチされる**といった意味になります。

#### exit
挙動を確認するとわかりやすいです。
Dockerコンテナ内で利用すると元のターミナルに戻ります（コンテナ内のシェルが終了する）。
ターミナルで利用するとターミナル自体が終了します（ターミナルのシェルが終了する）。
```terminal
$ exit
```

#### ps
現在動いてるプロセスを確認することができます。
以下のコマンドをよく使います。
```terminal
$ ps
$ ps aux
$ ps auxf
$ ps -ef
```
#### unshare
今回の主役コマンドです。
新しいNamespaceを作成してくれます。詳しい説明は後述します。
オプションに`--pid`とか`--mount`を付けることで、そのNamespaceを作成します。

# 実験環境のセットアップ
動作環境とdockerの起動・設定を説明します。

## 動作環境
- MacOS Apple M1
- Docker Engine v20.10.17

## Dockerの起動と設定
以下Dockerfileです。実験をするだけなのでだいぶ適当です。ご容赦ください。
```Dockerfile:Dockerfile
FROM ubuntu:latest

RUN apt update && apt install -y iproute2 iputils-ping procps psmisc

CMD [ "/bin/bash" ]
```
以下のコマンドでImageをビルドします。
Dockerfileが存在するパスに合わせてコマンドを変えてください。
```terminal:terminal
$ docker build -t container-exp .
```
コンテナを立ち上げます。privilegedをつけています。
```terminal:terminal
$ docker run --init -it --rm --privileged container-exp
```

# PID Namespaceの実験

## PID Namespaceの作成と検証
まず、新たなPID Namespaceを作成してみましょう。
Namespaceはunshare(1)コマンドを利用することで作成できます。PID Namespaceを作成するためには、オプションに`--pid`をつける必要があります。
PID Namespaceを作成すると、その親プロセスはPID1となるはずなので確認します。
```terminal:terminal
root@{your_container}$ echo $$ # $$は現在のPIDを示す
7
root@{your_container}$ unshare --pid --fork bash # 親プロセスがbashのPID Namespaceを作成する
root@{your_container}$ echo $$
1
```
想定した挙動を見せました。

続いて検証を行います。
PID Namespaceはプロセスを隔離するので、他の名前空間のプロセスに影響を及ぼせなくなるはずです。

実際に試してみます。
ここでは、プロセスをkillすることで影響を及ぼせるかをチェックすることにします。
もう一つの端末でdockerに入り、実験をします。
terminal-2で`sleep`をし、それをterminal-1側から`kill`してみます。

```terminal:terminal-2
$ docker exec -it {container id} bash # コンテナに入る
root@{your_container}$ sleep 60 # sleepする
```
```terminal:terminal-1
root@{your_container}$ unshare --pid --fork bash # 新たなPID Namespaceを作成
root@{your_container}$ ps -ef # プロセスを確認
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 03:49 pts/0    00:00:00 /sbin/docker-init -- /bin/bash
root         7     1  0 03:49 pts/0    00:00:00 /bin/bash
root        21     0  0 03:53 pts/1    00:00:00 bash
root        74     7  0 04:43 pts/0    00:00:00 unshare --pid --fork bash
root        75    74  0 04:43 pts/0    00:00:00 bash
root        79    21  0 04:43 pts/1    00:00:00 sleep 60
root        80    75  0 04:43 pts/0    00:00:00 ps -ef

root@{your_container}$ kill 79
bash: kill: (79) - No such process
```
想定通り、作成したPID Namespaceのプロセスから他のPID Namespaceのプロセスをkillできないことが確認できました。

## 親のPIDが見えている問題とその解決
ここで問題があります。新たなPID Namespaceを作成したのにも関わらず、上記の`ps -ef`コマンドでプロセスを確認すると隔離したはずのプロセスが見えてしまっています。
PID Namespaceを作成し、プロセスを隔離したので親のプロセスは見えない状態になるなのが望ましいです。なぜでしょうか。

この問題の原因は、PID Namespaceを作成したは良いが、procが更新されていなかったことにあります。
`ps`コマンドはprocファイルシステムがマウントされている/procを解析・フォーマットして現在のプロセスを出力しますが、PID Namespaceを作成しただけでは/procの更新をしません。つまり、親プロセスに関する/procが見えているということになります。
これは、現在のプロセスについてのprocファイルシステムを/procに`mount`してあげることで解決できます。

```terminal:terminal-1
root@{your_container}$ mount -t proc proc /proc
root@{your_container}$ ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  6 05:26 pts/0    00:00:00 bash
root         4     1  0 05:26 pts/0    00:00:00 ps -ef
```
欲しい結果が得られましたね。

## 親の/procが子プロセスのprocファイルシステムのマウントポイントになっている問題とその解決

しかし、実はまだ問題があります。
このまま、`exit`してみましょう。そして、`ps`をします。
```terminal
root@{your_container}$ exit
exit
root@{your_container}$ ps
Error, do this: mount -t proc proc /proc
```
ありゃま、なんとprocファイルシステムがマウントされていないようですね。
エラー文の通りコマンドを実行すると直りますが、毎回このようなエラーが発生しては困りますね。

この問題の原因ですが、新たなPID Namespace上で実行した`mount -t proc proc /proc`が親のプロセスのprocに影響を与えてしまったためです。

`unshare --pid`によって、bash以下のプロセスを分離することはできました。
ですが、実はこれだけで色々と都合よく分離ができるわけではありません。
今回の問題で言うと、マウントに関する分離が達成できません。つまり、親プロセスと同じマウントを見てしまっています。

じゃあどうすれば良いのか、となるのですが対応は簡単で`unshare`コマンドを打つ際にオプションに`--mount`をつけてあげて、Mount Namespaceも分離しすれば良いです。
```terminal
root@{your_container}$ unshare --pid --mount --fork bash
root@{your_container}$ ps
  PID TTY          TIME CMD
    1 pts/0    00:00:00 docker-init
    7 pts/0    00:00:00 bash
   10 pts/0    00:00:00 unshare
   11 pts/0    00:00:00 bash
   18 pts/0    00:00:00 ps
root@{your_container}$ mount -t proc proc /proc
root@{your_container}$ ps
  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
    6 pts/0    00:00:00 ps
root@{your_container}$ exit
root@{your_container}$ ps
  PID TTY          TIME CMD
    1 pts/0    00:00:00 docker-init
    7 pts/0    00:00:00 bash
   18 pts/0    00:00:00 ps
```
先ほどとは異なりエラーが発生しません。

## より簡潔な解決方法

実は先ほどの問題は`unshare`コマンドを打つ時に`--mount-proc`オプションを加えることで回避することができます。
```terminal
unshare --pid --fork --mount-proc bash
```
これによって`mount -t proc proc /proc`をしなくても最初からMount Namespaceが作成されます。

# まとめ
今回の実験を通じて、LinuxのNamespaceの具体的な動作とそれを利用したプロセスの隔離方法について理解を深めました。
特に、PID NamespaceとMount Namespaceに焦点を当てて実験をして、なんとなく概要を掴みました。