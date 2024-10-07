import React, { ReactNode } from 'react';

interface ModalProps {
    title: string,
    modalId: string,
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, modalId, children }) => {
  return (
    <div className="portfolio-modal modal fade" id={modalId} tabIndex={-1} aria-labelledby={modalId} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center pb-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* TODO: set correct CSS vvv*/}
                  <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">{title}</h2>
                  <div className="divider-custom">
                    <div className="divider-custom-line" style={{ maxWidth: "25rem" }}></div>
                  </div>
                  
                  {children}

                  <button className="btn btn-primary" data-bs-dismiss="modal">
                    <i className="fas fa-xmark fa-fw"></i>
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;