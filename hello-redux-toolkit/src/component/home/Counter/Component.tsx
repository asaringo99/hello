import { connect } from 'react-redux';
import { RootState } from '../../../app/store';
import Counter from './Counter';
import { increment, decrement } from '../../../app/slice/counter.slice';

const mapStateToProps = (state: RootState) => ({
    count: state.counter.value,
});

const mapDispatchToProps = {
    increment,
    decrement,
};

const connector = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default connector;
