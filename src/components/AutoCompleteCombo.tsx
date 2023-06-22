import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface Props {
  roleEvent: (role: string[]) => void;
}

export default function CheckboxesTags({ roleEvent }: Props) {
  // const setRoles = useQueryStore((s) => s.setRoles);

  const filterData = (v: any) => {
    let result: any = [];
    v.map((a: any) => {
      result.push(a.value);
    });
    // setRoles(result);
    roleEvent(result);
  };
  return (
    <>
      <Autocomplete
        multiple
        size="small"
        id="checkboxes-tags-demo"
        options={userRoles}
        disableCloseOnSelect
        isOptionEqualToValue={(option, value) => option.value === value.value}
        // getOptionLabel={(option) => option.label || ""}
        // onChange={(e, v) => console.log(e, v)}
        onChange={(_e, v) => filterData(v)}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        )}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="User Roles" placeholder="User Roles" />
        )}
      />
    </>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const userRoles = [
  { label: "Admin", value: "Admin" },
  { label: "Management", value: "Management" },
  { label: "User", value: "User" },
];
