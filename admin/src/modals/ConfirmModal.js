import React from 'react'
import PropTypes from 'prop-types'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

const ConfirmModal = ({
  visible,
  title,
  content,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
  ...props
}) => {
  return (
    <CModal visible={visible} onClose={onCancel} aria-labelledby="LiveDemoExampleLabel" {...props}>
      <CModalHeader onClose={onCancel}>
        <CModalTitle id="LiveDemoExampleLabel">{title || 'Xác nhận'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          {content ||
            'Bạn có chắc chắn muốn thực hiện hành động này không? Hành động này không thể hoàn tác!'}
        </p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onCancel}>
          {cancelText || 'Hủy'}
        </CButton>
        <CButton color="primary">{confirmText || 'Xác nhận'}</CButton>
      </CModalFooter>
    </CModal>
  )
}

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}

export default ConfirmModal
