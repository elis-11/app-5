export const Alert = ({alert}) => {

  if (!alert) {
    return null
  }

    return (
        <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
  <strong>Warning!</strong> 
      {alert.text}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
    )
}