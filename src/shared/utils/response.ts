export const Response = {
  success: ({
    message = 'Success',
    status = 200,
    data = [],
  }: {
    message?: string;
    data?: any;
    status?: number;
  }) => {
    return {
      status,
      message,
      data,
    };
  },
  error: ({
    message = 'Error',
    data = [],
    status = 422,
  }: {
    message?: string;
    data?: any;
    status?: number;
  }) => {
    return {
      status,
      message,
      data,
    };
  },
};
