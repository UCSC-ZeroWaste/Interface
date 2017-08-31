const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    zIndex            : 4,
    backgroundColor   : 'rgba(255, 255, 255, 0.35)'
  },
  content : {
    position                   : 'absolute',
    zIndex                     : 4,
    top                        : '50%',
    left                       : '50%',
    transform                  : 'translate(-50%, -50%)',
    width                      : '80%',
    height                     : '78%',
    border                     : '1px solid #ccc',
    borderRadius               : '4px',
    outline                    : 'none',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    padding                    : '0',
    display                    : 'flex',

  }
};

export default modalStyle;
