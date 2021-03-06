import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ReviewsPreview from '../reviews_preview/reviews_preview';
import ModalFormContainer from './modal_form_container';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.9)'
  },
  content : {
    position                   : 'absolute',
    top                        : '16%',
    left                       : '16%',
    right                      : '16%',
    bottom                     : '16%',
    background                 : '',
    border                     : '',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',
    padding                    : '0 20px'
  }
};

class ReviewModal extends React.Component {
  componentWillMount() {
    Modal.setAppElement('body');
  }

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const reviews = this.props.reviews;
    return (
      <div>
        <p onClick={this.openModal}
           className='review-modal-link white'>
           See all reviews ({reviews.length})
        </p>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

         <div className='review-modal-container'>
           <i className="fa fa-times close-review-modal"
             aria-hidden="true"
             onClick={ this.closeModal }></i>
           <div className='review-modal-top'>
             <section>
               <h2>{reviews.length} Member Reviews for {this.props.serieName}</h2>

             </section>
           </div>
           <div className='review-modal-bottom'>
             <ReviewsPreview userReview={this.props.userReview} reviews={reviews.reverse()} styling={'review-index-comment'}/> />
           </div>
         </div>

        </Modal>
      </div>
    );
  }
}


export default ReviewModal;
