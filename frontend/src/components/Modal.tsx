import React, { ReactNode } from 'react';

interface ModalProps {
    title: string,
    modalId: string,
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, modalId, children }) => {
  return (
    <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={modalId} aria-hidden="true">
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
                  <h2 className="text-primary mb-0 mb-2">{title}</h2>
                  
                  {children}
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