import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import DatePicker from "react-datepicker";
import { Checkbox } from "./ui/checkbox";
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm";
import React from "react"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import  Image  from "next/image"
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
interface customProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>
    fieldType: FormFieldType
    name: string
    label?: string
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    dateFormat?: string
    disabled?: boolean
    showTimeSelect?: boolean
  children?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderSkeleton?: (field :any) => React.ReactNode 
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderInput = ({ field, props }: { field: any, props: customProps }) => {
  const { iconSrc, iconAlt, placeholder, fieldType, showTimeSelect, dateFormat, renderSkeleton } = props
    switch (fieldType) {
      case FormFieldType.INPUT:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (
              <Image src={iconSrc} width={24} height={24} alt={ iconAlt || 'icon'} className="ml-2"/>
            )}
            <FormControl>
              <Input placeholder={placeholder} {...field} className="shad-input border-0">
              </Input>
            </FormControl>
          </div>
        )
        break;
      case FormFieldType.PHONE_INPUT:
        return (

          <FormControl>
            <PhoneInput
              placeholder={placeholder}
              value={field.value as E16Number | undefined}
              onChange={field.onChange}
              defaultCountry="US"
              international
              withCountryCallingCode
              className="input-phone" />
          </FormControl>
        )
        break;
      case FormFieldType.DATE_PICKER:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400 p-2">
            <Image src="/assets/icons/calendar.svg" width={26} height={26} alt="calender" className="ml-1" />
            <FormControl>
              <DatePicker selected={field.value} onChange={(date) => field.onChange(date)}
                showDateSelect={showTimeSelect ?? false} dateFormat={dateFormat ?? "MMMM d, yyyy"} timeInputLabel="Time: " wrapperClassName="date-picker-wrap" />
            </FormControl>
          </div>
        )
        break;
      case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
      case FormFieldType.SKELETON:
        return (
        renderSkeleton ? renderSkeleton(field) : null
        )
      case FormFieldType.TEXTAREA:
        return (
          <FormControl>
            <textarea placeholder={placeholder} {...field} disabled={ props.disabled} className="shad-textArea "/>
          </FormControl>
        )
      case FormFieldType.CHECKBOX:
        return (
          <div className="flex gap-4 item-center">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange}></Checkbox>
            <label htmlFor={props.name} className="checkbox-label">{ props.label} </label>
          </div>
        )
      default :
        break;
    }
    <Input type="text" placeholder="John Doe"/>
}
export const CustomFormField = (props: customProps) => {
    const {control, fieldType, name, label} = props
    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
              <FormItem className="flex-1">
                  {fieldType !== FormFieldType.CHECKBOX && label && (
                      <FormLabel>{ label }</FormLabel>
              )}
              <RenderInput field={field} props={props} />
              <FormMessage className="shad-error" />
            </FormItem>
          )}
        />
        
    )
}
