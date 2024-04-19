import { useState } from "react";
import { Combobox, Input, useCombobox, Flex, TextInput } from "@mantine/core";
import MemberBadge from "../MemberBadge";
import { IconCheck } from "@tabler/icons-react";

function SelectOption({ color, name, dropdown, selected }) {
  return (
    <>
      {dropdown ? (
        <div className="w-full flex justify-between">
          <div>
            <MemberBadge
              color={color}
              name={name}
              disableTooltip={true}
              className={""}
            />
            <span className="ml-2">{name}</span>
          </div>
          {selected && (
            <span>
              <IconCheck size={12} />
            </span>
          )}
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

export function MemberInputSingle({
  members,
  colors,
  label,
  onChange,
  disabled,
  defaultValue = null,
  required = true,
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [selectedValue, setSelectedValue] = useState(null);
  const selectedOption = members.find(
    (member) => selectedValue != null && selectedValue.id === member.id,
  );

  const options = members.map((member) => (
    <Combobox.Option value={member} key={member.name + member.id}>
      <Flex justify={"space-between"}>
        {
          <>
            <SelectOption
              name={member.name}
              color={colors[member.id % colors.length]}
              dropdown={true}
              selected={
                selectedValue
                  ? member.id === selectedValue.id
                  : defaultValue
                  ? member.id === defaultValue.id
                  : null
              }
            />
          </>
        }
      </Flex>
    </Combobox.Option>
  ));

  return (
    <div className="min-w-[150px]">
      <Combobox
        store={combobox}
        withinPortal={true}
        onOptionSubmit={(val) => {
          if (selectedValue && selectedValue.id === val.id) {
            setSelectedValue("");
            onChange(null);
          } else {
            setSelectedValue(val);
            onChange(val);
          }
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <TextInput
            disabled={disabled}
            required={required}
            label={label}
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            defaultValue={defaultValue}
            value={selectedValue}
            multiline
          >
            {selectedOption ? (
              <SelectOption
                name={selectedOption.name}
                color={colors[selectedOption.id % colors.length]}
                dropdown={false}
              />
            ) : defaultValue ? (
              <SelectOption
                name={defaultValue.name}
                color={colors[defaultValue.id % colors.length]}
                dropdown={false}
              />
            ) : (
              <Input.Placeholder>Pick member</Input.Placeholder>
            )}
          </TextInput>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options
            mah={200}
            style={{ overflowY: "auto", whiteSpace: "nowrap" }}
          >
            {options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
