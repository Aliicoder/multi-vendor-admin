export default (
  timestamp: Date,
  format: "full" | "date" | "time" | "day" = "full",
  style: "long" | "short" | "narrow" = "long"
): string => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: style,
    day: "numeric",
    month: style,
    year: "2-digit",
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }

  const dayOptions: Intl.DateTimeFormatOptions = {
    weekday: style,
  }

  let options: Intl.DateTimeFormatOptions
  if (format === "date") {
    options = dateOptions
  } else if (format === "time") {
    options = timeOptions
  } else if (format === "day") {
    options = dayOptions
  } else {
    options = { ...dateOptions, ...timeOptions }
  }

  return new Date(timestamp)
    .toLocaleString("en-US", options)
    .toLowerCase()
    .replace(/,/g, "")
    .replace(" ", ", ")
    .replace(/24/, "'24")
}
