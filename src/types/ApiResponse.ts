export default interface ApiResponse {
  success: boolean;
  code: number;
  msg?: string; // Optional message property
  data?: any; // Flexible data type for any response data
  meta?: object; // Optional meta information object
}
