export function apiError(
  message: string,
  status: number,
  code: string
) {
  return Response.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status }
  );
}
