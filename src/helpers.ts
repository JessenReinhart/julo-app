export const getFormData = (e: React.FormEvent<HTMLFormElement>) => {
  const form = e.target as HTMLFormElement;
  return Object.fromEntries(
    Array.from(form.elements).map((x: Element) => {
      const input = x as HTMLInputElement;
      return [input.name ?? input.id, input.value];
    })
  );
};
