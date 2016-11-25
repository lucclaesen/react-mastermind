import {connect} from "react-redux";
import {Color, Model} from "../state";
import {SelectColor} from "../actions";
import ColorOption from "./ColorOption";

const mapStateToProps = (state: Model, ownProps: {color: Color}) => {
    return {
        selected: state.selectedColor.color === ownProps.color,
        color: ownProps.color
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        signalNewColorSelected: (color: Color) => {
            dispatch(SelectColor(color));
        }
    };
}

const ColorOptionContainer = connect(mapStateToProps, mapDispatchToProps)(ColorOption);

export default ColorOptionContainer;