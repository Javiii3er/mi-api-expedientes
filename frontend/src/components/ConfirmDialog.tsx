import { Modal, Button } from 'react-bootstrap'

interface Props {
  show: boolean
  title: string
  message: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void
}

export const ConfirmDialog = ({ show, title, message, onCancel, onConfirm }: Props) => (
  <Modal show={show} onHide={onCancel} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
      <Button variant="danger" onClick={onConfirm}>Confirmar</Button>
    </Modal.Footer>
  </Modal>
)
