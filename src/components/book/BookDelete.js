import { Modal } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

const BookDelete = (props) => {
    const { show, setShow, onDeleteHandler } = props;
    const navigate = useNavigate();
    const handleClose = () => {
        setShow(false);
    }
    const handleDelete = () => {
        onDeleteHandler();
        handleClose();
        navigate("/homes")
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you delete?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleClose} className="btn btn-secondary">Close</button>
                            <button type="button" onClick={handleDelete} className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </>
    )
}

export default BookDelete;