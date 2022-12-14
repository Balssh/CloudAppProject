import * as React from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Grid,
  Typography,
  InputAdornment,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";

const autocompleteService = { current: null };

const AutocompleteMUI = ({ handleLocation }) => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const locationChange = (event, newValue) => {
    handleLocation(newValue);
    setValue(newValue);
  };

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="autocompleteMUI"
      fullWidth
      sx={{
        mb: 1,
        "& label.Mui-focused": {
          color: theme.palette.outlines.selected,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: theme.palette.outlines.selected,
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: theme.palette.outlines.default,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.outlines.hover,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.outlines.selected,
          },
        },
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        locationChange(event, newValue);
        // setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add a location"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
              <InputAdornment position="end">
                <AddLocationAltOutlinedIcon edge="end" />
              </InputAdornment>
              {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default AutocompleteMUI;
