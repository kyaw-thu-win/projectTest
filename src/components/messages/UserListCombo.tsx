import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import useQueryStore from "../../hooks/queryStore";
import { useUsersAll } from "../../hooks/useUser";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const { data, isLoading } = useUsersAll();
  const setReceiverList = useQueryStore((s) => s.setReceiverList);

  const filterData = (v: any) => {
    let result: any = [];
    v.map((a: any) => {
      result.push(a._id);
    });
    setReceiverList(result);
  };
  if (isLoading) return null;
  return (
    <>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        // options={userRoles}
        options={data.result}
        disableCloseOnSelect
        // isOptionEqualToValue={(option: any, value) => {
        // return option._id === value._id;
        // }}
        getOptionLabel={(option: any) => option.email || ""}
        // onChange={(e, v: any) => console.log(v[0]._id)}
        onChange={(_e, v) => filterData(v)}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.email}
          </li>
        )}
        // style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Receiver Email"
            placeholder="Receiver Email"
          />
        )}
      />
    </>
  );
}
