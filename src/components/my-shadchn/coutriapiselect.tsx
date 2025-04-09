import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectDemoCountry() {
    return (
        <Select>
            <SelectTrigger className="w-[448px] h-[24px] px-2 py-3 justify-center items-center gap-4">
                <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>city</SelectLabel>
                    <SelectItem value="Mongulia">Mongulia</SelectItem>
                    <SelectItem value="Japen">Japen</SelectItem>
                    <SelectItem value="Koreo">Koreo</SelectItem>
                    <SelectItem value="United-State">United-State</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
