import { Badge, Tooltip } from "@mantine/core";

function MemberBadge({
  color,
  name,
  className,
  disableTooltip = false,
  size = "md",
}) {
  return (
    <Tooltip label={name} disabled={disableTooltip}>
      <Badge
        size={size}
        className={className}
        variant="filled"
        circle
        color={color}
      >
        {name.slice(0, 2)}
      </Badge>
    </Tooltip>
  );
}

export default MemberBadge;
