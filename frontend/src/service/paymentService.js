import axios from "axios";
const server = import.meta.env.VITE_SERVER_PORT;

export class PaymentService {
  async createPayment(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${server}/course/checkout/${id}`,{},{
            headers: {
            token
            }}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyPayment(paymentId,razorpay_payment_id, razorpay_order_id, razorpay_signature) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${server}/api/verification/${paymentId}`,
      {
        razorpay_payment_id, razorpay_order_id, razorpay_signature
      },{
        headers: {
        token
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
const paymentService = new PaymentService();
export default paymentService;