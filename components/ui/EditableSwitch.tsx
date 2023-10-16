"use client";
import { useEditable } from "@/lib/hooks/useEditable";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const EditableSwitch = () => {
  const { editable, setEditable } = useEditable();

  const handleSwitchChange = (checked: boolean) => setEditable(checked);

  return (
    <>
      <Switch
        defaultChecked={editable}
        onCheckedChange={handleSwitchChange}
        id="editable-switch"
      ></Switch>

      <Label htmlFor="editable-switch">
        {editable ? "Edits allowed" : "Edits blocked"}
      </Label>
    </>
  );
};

EditableSwitch.displayName = "EditableSwitch";
export default EditableSwitch;
