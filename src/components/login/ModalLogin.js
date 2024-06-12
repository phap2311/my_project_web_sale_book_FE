import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useNavigate} from "react-router-dom";
import Login from "./Login";

export default function ModalLogin(props) {
    const navigate = useNavigate();
    const { show, onClose} = props;
    const redirectTo = () => {
        onClose();
        navigate(`/homes`);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thành công !</Modal.Title>
            </Modal.Header>
            <Modal.Body>Đăng nhập thành công</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={redirectTo}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
