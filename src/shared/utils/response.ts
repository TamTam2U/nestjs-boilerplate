export const Response = {
  success: ({
    message = 'Success',
    data = null,
    status = 200,
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
    data = null,
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
