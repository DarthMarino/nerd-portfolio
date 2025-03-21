export const isPhone = (): boolean => {
  const userAgent = navigator.userAgent;

  // List of mobile device identifiers
  const phoneRegex =
    /android|iphone|ipad|ipod|blackberry|bb|playbook|windows phone|kindle|silk|opera mini/i;

  return phoneRegex.test(userAgent);
};
