type BorderRadius = "small" | "base" | "large" | "max"
export const borderRadius: Record<BorderRadius, number> = {
  small: 5,
  base: 10,
  large: 20,
  max: 9999,
}

type BorderWidth = "smallThin" | "thin" | "base" | "thick"
export const borderWidth: Record<BorderWidth, number> = {
  smallThin: .5,
  thin: 1,
  base: 2,
  thick: 3,
}
