export type DataResponse<T> = {
  Success: boolean;
  Message: string;
  data?: T;
};

/** DoctorController */
export interface DoctorDto {
  id: string;
  name: string;
  mobile: string;
  email: string;
  active: boolean;
  profile_image_key: string;
  speciality: string;
  degree: string;
}

export interface GetDotcorsListRequest {
  clinic_id: string;
}

export type GetDoctorsListResponse = DataResponse<DoctorDto[]>;

export type AddDoctorRequest = Omit<DoctorDto, 'id'> & {
  password: string;
  clinic_id: string;
};

export type AddDoctorResponse = DataResponse<any>;

/** CusotmerController */
export interface CustomerDto {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile_image_key: string;
  active: boolean;
  address: string;
  is_agent: boolean;
}

/** Clinic Controller */
export interface ClinicDto {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile_image_key: string;
  active: boolean;
  address_id: string;
}

/** UserController */
export interface LoginRequest {
  email: string;
  password: string;
  userType: number;
}

export type LoginResponse = DataResponse<any>;

export interface SignupRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
  usertype: number;
}

export type SignupResponse = DataResponse<any>;

/** BookingController */
export enum BookingStatus {
  BOOKED = 'BOOKED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
  COMPLETED = 'COMPLETED',
}
export interface BookingDto {
  id: string;
  customer_id: string;
  doctor_clinic_id: string;
  slot_index: number;
  workingtime_id: string;
  created_datetime: number;
  status: BookingStatus;
  group_id: string;
  modified_datetime: number;
  payment_order_id: string;
  agent_id?: string;
}
export type BookSlotRequest = Omit<
  BookingDto,
  'id' | 'created_datetime' | 'modified_datetime' | 'group_id' | 'status'
> & {
  group_id?: string;
};
export type BookSlotResponse = DataResponse<any>;

export enum PaymentStatus {
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface PyamentDto {
  id: string;
  booking_group_id: string;
  payment_amount?: string;
  payment__mode?: string;
  payment_datetime?: string;
  order_id: string;
  transtation_id: string;
  status: PaymentStatus;
}

export interface GetOccupiedSlotsRequest {
  doctor_clinic_id: string;
  dateString: string; // YYYY-MM-DD
}

export interface OccupiedSlots {
  dateString: string;
  work_time_id: string;
  from_time: string;
  to_time: string;
  slotsCount: number;
  occupiedSlots: number[];
}

export type GetOccupiedSlotsResponse = DataResponse<OccupiedSlots[]>;

export interface WorkingTimeDto {
  id: string;
  doctor_clinic_id: string;
  entry_id: string;
  week_day: number;
  from_time: string;
  to_time: string;
  week: number;
  no_of_slot: number;
}

export interface OccupiedDto {
  work_time_id: string;
  doctor_clinic_id: string;
  entry_id: string;
  week_day: number;
  from_time: string;
  to_time: string;
  week: number;
  no_of_slot: number;
  booking_id: string;
  slot_index: number;
  workingtime_id: string;
  created_datetime: number;
  status: BookingStatus;
  group_id: string;
}

export interface GetAppointmentsRequest {
  customerId?: string;
  doctorId?: string;
  status?: BookingStatus;
}
export interface Appointmentdto extends BookingDto {
  customerName?: string;
  customer_image_key?: string;
  doctorsName?: string;
  doctorSpeciality?: string;
  clinic_name?: string;
  clinic_address?: string;
}
export type GetAppointmentResponse = DataResponse<Appointmentdto[]>;
