type Timeout = ReturnType<typeof setTimeout>

export function debounce<TArg>(func: (...args: TArg[]) => void, delay: number) {
  let timeout: Timeout
  return (...args: TArg[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}
