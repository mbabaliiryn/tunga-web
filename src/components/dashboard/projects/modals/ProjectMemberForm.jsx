import React from 'react';
import {FormGroup} from 'reactstrap';
import PropTypes from 'prop-types';

import UserSelector from '../../../core/UserSelector';
import Button from '../../../core/Button';


export default class ProjectMemberForm extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        max: PropTypes.number,
        proceed: PropTypes.func,
        cancel: PropTypes.func,
        dismiss: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };
    }

    onSelectUser = (selected) => {
        const {max} = this.props;
        if (max === 0) {
            this.setState({selected});
        } else if(max > 0) {
            this.setState({selected: selected.slice(0, max)});
        }
    };

    onSave = (e) => {
        e.preventDefault();

        if(this.props.proceed) {
            this.props.proceed(this.state.selected);
        }
    };

    componentDidUpdate(prevProps) {
        if(JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)) {
            
        }
    }

    render() {
        return (
            <div className="project-team">
                <form onSubmit={this.onSave}>
                    <FormGroup>
                        <UserSelector account_type={this.props.type}
                            onChange={this.onSelectUser.bind(this)}
                            variant='bottom'
                            max={this.props.max}
                        />
                    </FormGroup>
                    <div className="float-right add-button">
                        <Button onClick={this.onSave}>Save</Button>
                    </div>
                </form>
            </div>
        );
    }
}
