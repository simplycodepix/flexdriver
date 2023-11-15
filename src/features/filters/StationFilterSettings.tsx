import { z } from "zod";

import {
  Form,
  FormGroup,
  FormInput,
  FormRange,
  FormSwitch,
  FormToggleButtonGroup,
} from "~/features/ui/form";

import { Tile } from "~/features/ui";

const filterSchema = z.object({
  active: z.boolean(),
});

type FormValues = z.infer<typeof filterSchema>;

export function StationFilterSettings() {
  return (
    <Form<FormValues> schema={filterSchema}>
      {({ watch }) => {
        const active = watch("active");
        return (
          <div className="flex flex-col gap-8">
            <Tile endAdornment={<FormSwitch name="active" />}>
              <div className="text-base">Filter Status</div>
              <span className="text-sm text-gray-500">
                Filter is {active ? "On" : "Off"}
              </span>
            </Tile>

            <FormGroup label="Filter Name">
              <Tile>
                <FormInput
                  border={false}
                  color="transparent"
                  name="name"
                  inputStyles="bg-transparent"
                  placeholder="Default"
                />
              </Tile>
            </FormGroup>

            <FormGroup label="Days of the week">
              <FormToggleButtonGroup
                label="Select days of the week that this filter should affect"
                name="days_of_week"
                buttonStyles="w-14"
                options={[
                  { label: "Mon", value: "monday" },
                  { label: "Tue", value: "tuesday" },
                  { label: "Wed", value: "wednesday" },
                  { label: "Thu", value: "thursday" },
                  { label: "Fri", value: "friday" },
                  { label: "Sat", value: "saturday" },
                  { label: "Sun", value: "sunday" },
                ]}
              />
            </FormGroup>

            <FormGroup className="flex flex-col gap-1" label="Block Filter">
              <Tile
                className="flex-wrap"
                startAdornmentStyles="w-full"
                startAdornment={
                  <div className="mb-4 flex w-full items-center justify-between">
                    <span className="text-sm">Minimal Price Per Block</span>
                    <span className="text-xs text-gray-400">
                      No Minimal Price
                    </span>
                  </div>
                }
              >
                <FormRange name="minimal_price_per_block" />
              </Tile>
              <Tile
                className="flex-wrap"
                startAdornmentStyles="w-full"
                startAdornment={
                  <div className="mb-4 flex w-full items-center justify-between">
                    <span className="text-sm">Min Hours</span>
                    <span className="text-xs text-gray-400">No Min Hours</span>
                  </div>
                }
              >
                <FormRange name="min_hours" />
              </Tile>
              <Tile
                className="flex-wrap"
                startAdornmentStyles="w-full"
                startAdornment={
                  <div className="mb-4 flex w-full items-center justify-between">
                    <span className="text-sm">Max Hours</span>
                    <span className="text-xs text-gray-400">No Max Hours</span>
                  </div>
                }
              >
                <FormRange name="max_hours" />
              </Tile>
              <Tile
                className="flex-wrap"
                startAdornmentStyles="w-full"
                startAdornment={
                  <div className="mb-4 flex w-full items-center justify-between">
                    <span className="text-sm">Time Needed to Arrive</span>
                    <span className="text-xs text-gray-400">No time</span>
                  </div>
                }
              >
                <FormRange name="time_to_arrive" />
              </Tile>
            </FormGroup>

            <div className="flex flex-col gap-4">
              <FormGroup label="Stations (0)">
                <Tile endAdornment={<FormSwitch name="display_full_name" />}>
                  <div className="text-base">Display full name</div>
                </Tile>
              </FormGroup>
              <FormToggleButtonGroup
                label="Select stations that this filter should affect"
                name="stations"
                options={[
                  { label: "test", value: "test" },
                  { label: "test2", value: "test2" },
                  { label: "test3", value: "test3" },
                ]}
              />
            </div>
          </div>
        );
      }}
    </Form>
  );
}
