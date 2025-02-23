'use server'
import { ID, Query } from "node-appwrite";
import { formatDateTime } from "../utils";
import { revalidatePath } from "next/cache";
import {
  databases,
  messaging,
} from "../appwrite.config";
import {  parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw Error;

    const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for $/]{formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for $/{formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      appointmentId
    )
    return parseStringify(appointment);
  } catch (error) {
    console.log(error)
  }
}
export const getRecentAppointment = async () => {
  try {
    const recentAppointment = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    )
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0
    }
    const counts = (recentAppointment.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduledCount +=1
      }
      else if (appointment.status === 'pending') {
        acc.pendingCount += 1
      }
      else {
        acc.cancelledCount += 1
      }
      return acc
    }, initialCounts)
    const data = {
      totalCount: recentAppointment.total,
    ...counts,
      documents: recentAppointment.documents
    }
    return parseStringify(data)
  } catch (error) {
    console.log(error)
  }
}
