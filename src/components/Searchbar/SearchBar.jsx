import Box from "@mui/material/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

function SearchBar(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <div>
        <TextField
          label="Search articles"
          type="text"
          name="text"
          value={props.text}
          onChange={props.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon onClick={props.handleSubmit} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Box>
  );
}

export default SearchBar;
