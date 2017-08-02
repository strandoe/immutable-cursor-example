import React, { Component } from 'react';
import glam from 'glamorous';
import { fromJS, List } from 'immutable';

const InputEl = glam.input({
    display: 'block'
});

class Input extends Component {

    static defaultProps = {
        validate: ''
    };

    shouldComponentUpdate = (nextProps) => {
        let shouldChange = !this.props.cursor.equals(nextProps.cursor);
        return shouldChange;
    };

    handleChange = e => {
        const { value } = e.target;
        const { cursor } = this.props;

        cursor.set('value', value);
    };

    onBlur = (e) => {
        const validations = this.props.validate.split(' ');

        const messages = [];

        if (validations.includes('notBlank')) {
            if (e.target.value.trim() === '') {
                messages.push({ key: 'notBlank', args: [] });
            }
        }
        this.props.cursor.set('messages', fromJS(messages));
    };

    input = () => {
        const { cursor } = this.props;

        return (
            <InputEl onBlur={this.onBlur} type="text" value={cursor.get('value') || ''} onChange={this.handleChange} />
        );
    };

    toggleHelp = (e) => {
        e.preventDefault();
        this.props.cursor.set('showHelp', !this.props.cursor.get('showHelp'));
    };

    render = () => {
        const { cursor, helptext } = this.props;
        return (
            <div>
                {this.input()}
                <ul>
                {
                    cursor.get('messages', List()).map(v =>
                        <li>{v.get('key')}</li>
                    )
                }
                </ul>
                <button onClick={this.toggleHelp}>Hjelp</button>
                {
                    cursor.get('showHelp') &&
                    <div>
                        {helptext}
                    </div>
                }
            </div>
        );
    };
}

export default Input;
