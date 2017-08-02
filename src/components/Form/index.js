import React, { Component } from 'react';
import Input from 'components/Input';

class Form extends Component {

    shouldComponentUpdate = (nextProps) => {
        let shouldChange = !this.props.cursor.equals(nextProps.cursor);
        return shouldChange;
    };

    render = () => {
        const { cursor } = this.props;
        return (
            <form>
                <Input id="d" cursor={cursor.get('d')} validate="notBlank" helptext="Fill out if you are over 21"/>
                <Input id="e" cursor={cursor.get('e')} validate="notBlank" helptext="Fill out if you are over 21"/>
            </form>
        );
    };
}

export default Form;
