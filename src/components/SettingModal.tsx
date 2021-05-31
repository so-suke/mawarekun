import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

export function SettingModal(props: { sizeTenKey: string; changeSizeButton: React.ChangeEventHandler }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        設定
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>設定</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm">
            <InputGroup.Prepend>
              <InputGroup.Text>ボタン大きさ</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={props.sizeTenKey} onChange={props.changeSizeButton} type="number" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
