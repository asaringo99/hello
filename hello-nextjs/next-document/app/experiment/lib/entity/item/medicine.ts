class MedicineItem implements ItemEntity {
	constructor(readonly name: string, readonly effect: string, readonly description: string) {
		this.name = name
		this.effect = effect
		this.description = description
	}

	onClickDetail() {
		
		return
	}
}