import React from 'react';
import {
    FormGroup,
    ControlLabel,
    HelpBlock,
    FormControl,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap';

import '../assets/css/fieldStyle.css';

function FieldGroup({id, label, help, ...props}) {

    const tooltip = (
        <Tooltip id="tooltip">Campo obligatorio</Tooltip>
    );
    let requerido =
        (
            <OverlayTrigger placement="left" overlay={tooltip}>
                <div className="required-icon">
                    <div className="text">*</div>
                </div>
            </OverlayTrigger>
        );

    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <div className="required-field-block">
                <FormControl {...props} />
                {props.required ? (requerido) : ""}
            </div>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default FieldGroup;