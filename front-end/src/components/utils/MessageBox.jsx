import Alert from 'react-bootstrap/Alert'

export default function MessageBox({variant, message}) {
  return (
    <Alert variant={variant || 'info'}>{message}</Alert>
  )
}