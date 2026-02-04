export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    form: {
      company: string;
      name: string;
      phone: string;
      email: string;
      needs: string;
      needsPlaceholder: string;
      submit: string;
      submitting: string;
    };
    validation: {
      companyRequired: string;
      nameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
      emailRequired: string;
      emailInvalid: string;
    };
    success: string;
    error: string;
  };
}
