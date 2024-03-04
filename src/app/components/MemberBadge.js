import { Badge, Tooltip } from "@mantine/core";

function MemberBadge({ color, name, className, disableTooltip = false }) {
  return (
    <Tooltip label={name} disabled={disableTooltip}>
      <Badge className={className} variant="filled" circle color={color}>
        {name.slice(0, 2)}
      </Badge>
    </Tooltip>
  );
}

export default MemberBadge;
