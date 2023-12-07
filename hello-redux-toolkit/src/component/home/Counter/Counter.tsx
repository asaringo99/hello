import React from 'react';
import { decrement, increment } from '../../../app/slice/counter.slice';
import { useAppDispatch, useAppSelector } from '../../../app/hook';

const Counter: React.FC = () => {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    const clickButtonIncrement = () => {
        dispatch(increment());
    };
    const clickButtonDecrement = () => {
        dispatch(decrement());
    };

    return (
        <div>
            <div>Counter: {count} </div>
            <div>
                <button onClick={clickButtonIncrement}>+</button>
                <button onClick={clickButtonDecrement}>-</button>
            </div>
        </div>
    );
};

export default Counter;
