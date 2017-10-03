import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../../../App.scss';

export default class KeyboardButton extends PureComponent {
	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
		classes: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		autofocus: PropTypes.bool,
		isDisabled: PropTypes.bool,
	};

	static defaultProps = {
		classes: '',
		autofocus: false,
		isDisabled: false,
	};

	handleClick = () => this.props.onClick(this.props.value)

	render() {
		return (
			<button
				type="button"
				className={ `${styles['keyboard-button']} ${styles[this.props.classes]}` }
				onClick={this.props.isDisabled ? null : this.handleClick}
				autoFocus={this.props.autofocus}
				disabled={this.props.isDisabled}
			>
				{this.props.value}
			</button>
		);
	}
}
