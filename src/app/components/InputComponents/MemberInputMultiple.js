import { useEffect, useState } from "react";
import {
  Combobox,
  Input,
  InputBase,
  useCombobox,
  Flex,
  Checkbox,
} from "@mantine/core";
import MemberBadge from "../MemberBadge";
import { IconCheck } from "@tabler/icons-react";

function SelectOption({ color, name, dropdown }) {
  return (
    <>
      {dropdown ? (
        <div>
          <MemberBadge
            color={color}
            name={name}
            disableTooltip={true}
            className={"ml-1"}
          />
          <span className="ml-5">{name}</span>
        </div>
      ) : (
        <MemberBadge
          color={color}
          name={name}
          disableTooltip={true}
          className={"ml-1"}
        />
      )}
    </>
  );
}

export function MemberInputMultiple({
  members,
  colors,
  label,
  form,
  disabled,
  defaultValue,
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const memberIds = members.map((member) => member.id);
  const [selectedValues, setSelectedValues] = useState(
    defaultValue ? defaultValue : members,
  );

  const selectedOptions = members.filter((member) =>
    selectedValues.map((val) => val.id).includes(member.id),
  );

  const allSelected =
    memberIds.filter((id) => !selectedValues.map((val) => val.id).includes(id))
      .length === 0;

  const handleSelectAll = () => {
    if (!allSelected) {
      setSelectedValues(members);
    } else {
      setSelectedValues([]);
    }
  };

  useEffect(() => {
    form.setFieldValue("sharedBy", selectedValues);
  }, []);

  const options = members.map((member) => (
    <Combobox.Option value={member} key={member.name + member.id}>
      <Flex justify={"space-between"}>
        <SelectOption
          name={member.name}
          color={colors[member.id % colors.length]}
          dropdown={true}
        />
        {selectedOptions.map((member) => member.name).includes(member.name) && (
          <IconCheck size={17} />
        )}
      </Flex>
    </Combobox.Option>
  ));
  return (
    <Combobox
      store={combobox}
      withinPortal={true}
      onOptionSubmit={(val) => {
        if (val === "all") {
          form.setFieldValue("sharedBy", !allSelected ? members : []);
        } else if (!selectedValues.map((val) => val.id).includes(val.id)) {
          setSelectedValues([...selectedValues, val]);
          form.setFieldValue("sharedBy", [...selectedValues, val]);
        } else {
          const filtered = selectedValues.filter(
            (value) => value.id !== val.id,
          );
          setSelectedValues(filtered);
          form.setFieldValue("sharedBy", filtered);
        }
      }}
    >
      <Combobox.Target>
        <InputBase
          disabled={disabled}
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map((selectedOption) => (
              <SelectOption
                name={selectedOption.name}
                color={colors[selectedOption.id % colors.length]}
                dropdown={false}
              />
            ))
          ) : (
            <Input.Placeholder>Pick value</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
          <Combobox.Option value={"all"} onClick={handleSelectAll}>
            <Flex>
              <Checkbox checked={allSelected} className="ml-1" />
              <span className="ml-5">Select All</span>
            </Flex>
          </Combobox.Option>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
