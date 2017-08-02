import React, { PureComponent } from 'react';
import { fromJS } from 'immutable';
import Cursor from 'immutable-cursor';
import Form from 'components/Form';

class App extends PureComponent {

    handleUpdate = (nextValue, prevValue, keyPath) => {
        console.log('Value changed from', prevValue, 'to', nextValue, 'at', keyPath);
        this.setState({ data: Cursor.from(nextValue, this.handleUpdate)});
    };

    state = {
        cursor: Cursor.from(fromJS({ a: { value: 'a' }, b: { value: 'b' }, c: { d: { value: 'd' }, e: { value: 'e' } } }), this.handleUpdate)
    };

    changeSomeTopState = () => {
        this.state.cursor.set('a', Math.random());
    };

    render = () => {
        const { cursor } = this.state;

        return (
            <div>
                <div>{cursor.get('a')}</div>
                <button onClick={this.changeSomeTopState}>Change some top state</button>
                <Form cursor={cursor.get('c')} />
            </div>
        );
    };
}

export default App;
