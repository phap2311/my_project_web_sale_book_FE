import { Modal } from 'react-bootstrap';

const CartDelete = (props) => {
    const { show, setShow, onDeleteHandler } = props;
    const handleClose = () => {
        setShow(false);
    }
    const handleDelete = () => {
        onDeleteHandler();
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">BookSale say</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Xóa sản phẩm này ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleClose} className="btn btn-secondary">Cancel</button>
                            <button type="button" onClick={handleDelete} className="btn btn-primary">OK</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </>
    )
}

export default CartDelete;