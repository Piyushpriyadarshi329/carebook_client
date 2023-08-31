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
  profile_image: string;
  profile_image_key: string;
  speciality: string;
  degree: string;
  appointment_time: number;
  fees: number;
  about: string;
  no_of_bookings?: number;
  experience?: number;
}

export interface SpecialityDto {
  id: string;
  name: string;
  doc_key: string;
}
export interface LocationDto {
  id: string;
  name: string;
}
export type GetLocationListResponse = DataResponse<(LocationDto & {})[]>;

export interface GetDotcorsListRequest {
  clinic_id?: string;
  doctor_id?: string;
  speciality?: string;
  city?: string;
  mobile?: string;
  orderBy?: 'BOOKINGS' | 'NAME';
}

export type GetDoctorsListResponse = DataResponse<
  (DoctorDto & {
    profile_image: string;
    fees?: number;
  })[]
>;
export type GetDoctorResponse = DataResponse<
  DoctorDto & {profile_image: string; fees?: number}
>;
export type GetSpecialityListResponse = DataResponse<(SpecialityDto & {})[]>;

export type AddDoctorRequest = Omit<DoctorDto, 'id'> & {
  password: string;
  clinic_id: string;
};
export type AddDoctorResponse = DataResponse<{id: string}>;

export interface LinkDoctorRequest {
  clinic_id: string;
  doctor_id: string;
}

export type UpdateDoctorReqParams = {id: string};

export type UpdateDoctorRequest = {
  clinic_id?: string;
  name?: string;
  active?: boolean;
  profile_image_key?: string;
  speciality?: string;
  degree?: string;
  appointment_time?: number;
  fees?: number;
  about?: string;
  no_of_bookings?: number;
  experience?: number;
};

export type UpdateClinicReqParams = {id: string};
export type UpdateClinicRequest = {
  name?: string;
  active?: boolean;
  mobile?: string;
  email?: string;
  profile_image_key?: string;
  address_id?: string;
  about?: string;
};

export interface LeaveDto {
  id: string;
  doctor_id: string;
  fromdate: number;
  todate: number;
  worktime_id: string;
  created_datetime: string;
  active: boolean;
  fullday: boolean;
  reason?: string;
  clinic_id: string;
}
export type AddLeaveRequest = Omit<
  LeaveDto,
  'id' | 'created_datetime' | 'active'
>;
export type GetLeaveRequest = {
  doctor_id: string;
  clinic_id?: string;
  fromDate: number;
};

/** CusotmerController */
export interface CustomerDto {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile_image_key: string;
  profile_image: string;
  active: boolean;
  address: string;
  is_agent: boolean;
  gender: string;
  age: number;
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
  about: string;
}
export interface ClinicWithAddress extends ClinicDto {
  address: ShowAddress;
}
export type ClinicWithAddressAndImage = ClinicWithAddress & {
  profile_image: string;
  clinic_doctor_id?: string;
  fees?: number;
};
export type GetClinicsResponse = DataResponse<ClinicWithAddressAndImage[]>;

/** UserController */
export interface LoginRequest {
  email: string;
  password: string;
  userType: number;
  fcm_token: string;
}

export type LoginResponse = DataResponse<any>;

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  DOCTOR = 'DOCTOR',
  CLINIC = 'CLINIC',
}
export interface SignupRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
  usertype: UserType;
}

export type SignupResponse = DataResponse<any>;

/** BookingController */
export enum BookingStatus {
  BOOKED = 'BOOKED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
  COMPLETED = 'COMPLETED',
  STARTED = 'STARTED',
  NA = 'NA',
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
  appointment_date: number;
  existing_booking_id?: string;
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
  dateString: number;
  work_time_id: string;
  from_time: string;
  to_time: string;
  slotsCount: number;
  occupiedSlots: number[];
}

export type GetOccupiedSlotsResponse = DataResponse<OccupiedSlots[]>;

export interface WorkingTimeDto {
  id: string;
  doctor_id: string;
  clinic_id: string;
  entry_id: string;
  week_day: number;
  from_time: string;
  to_time: string;
  week?: number;
  no_of_slot: number;
}
export type AddAvailabilityRequest = Omit<
  WorkingTimeDto,
  'id' | 'week_day' | 'week'
> & {
  week_day: number[];
  month_week?: number[];
  all_weeks: boolean;
};
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
  appointment_date?: number;
  from_date?: number;
}
export interface Appointmentdto extends BookingDto {
  customerName?: string;
  customer_image_key?: string;
  doctorsName?: string;
  doctorSpeciality?: string;
  doctor_id?: string;
  clinic_name?: string;
  from_working_time?: string;
  address: ShowAddress;
}

export interface ShowAddress {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  lat?: number;
  lan?: number;
}
export interface AddressDto extends ShowAddress {
  id: string;
}
export interface AddAdressRequest {
  id?: string;
  user_id?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: number;
  lat?: number;
  lan?: number;
  type: 'Clinic' | 'Doctor' | 'Customer';
}
export interface GetAdressRequest {
  user_id?: string;
}
export interface updateSlotsStatusRequest {
  id?: string;
  status?: string;
}

export interface AddAdresstdto extends AddAdressRequest {
  id?: string;
}
export interface GetAdresstdto extends GetAdressRequest {}

export type AddAdressResponse = DataResponse<AddAdresstdto[]>;
export type GetAdressResponse = DataResponse<AddAdresstdto[]>;
export type GetAppointmentResponse = DataResponse<Appointmentdto[]>;

export type GetAvailabilityRequest = {
  doctor_id?: string;
  clinic_id?: string;
};
export type AvailabilityRes = WorkingTimeDto & {clinic_name: string};
export type GetAvailabilityResponse = DataResponse<AvailabilityRes[]>;

export type GetBookingAvailabilityRequest = {
  doctor_id: string;
  clinic_id: string;
  date: number;
};

export interface BookingAvailability {
  workingtime_id: string;
  fromtime: string;
  totime: string;
  slots: Slot[];
}
export type GetBookingvavilabilityResponse = BookingAvailability[];

export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  NA = 'NA',
}

export interface Slot {
  index: number;
  status: SlotStatus;
}

export interface GetBookingsSummaryRequest {
  doctor_id: string;
}
export type GetBookingsSummaryResponse = DataResponse<
  {clinic_id: string; count: number; appointment_date: number}[]
>;

export interface Document {
  id: string;
  fileName: string;
  path: string;
}

export interface VisibleDocument {
  id: string;
  fileKey: string;
  presignedUrl: string;
}

export type AddDocumentResponse = DataResponse<VisibleDocument>;
