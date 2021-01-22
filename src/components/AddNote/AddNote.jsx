import React, { useState } from 'react'
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"

const AddNote = ({ handleAdd }) => {
  const [isOpen, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const openDialog = () => setOpen(true)
  const closeDialog = () => {
    setOpen(false)
    setContent("")
  }
  const handleSubmit = () => {
    closeDialog()
    handleAdd(content)
  }

  return (
    <div>
      <Button onClick={openDialog} variant="contained" color="primary" style={{ fontSize: "1.4em" }}>
        Add Note
        </Button>
      <Dialog open={isOpen} onClose={closeDialog} fullWidth>
        <DialogTitle id="form-dialog-title">Add a new note to this machine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This note gets stored locally in your browser.
          </DialogContentText>
          <TextField
            value={content}
            onChange={ev => setContent(ev.target.value)}
            label="Note content"
            autoFocus
            multiline
            rows={3}
            margin="dense"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


export default AddNote
