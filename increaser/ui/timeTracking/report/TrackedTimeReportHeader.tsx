import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { BasedOnNumber } from '@lib/ui/layout/BasedOnNumber'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TrackedTimeReportTitle } from './TrackedTimeReportTitle'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { ReportFilters } from './filters/ReportFilters'
import { ManageProjectsNamesVisibility } from './filters/ManageProjectsNamesVisibility'
import styled from 'styled-components'

const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  gap: 8px;
  flex: 1;
  justify-content: end;
`

export const TrackedTimeReportHeader = () => {
  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <VStack ref={setElement} fullWidth>
          {size && (
            <BasedOnNumber
              value={size.width}
              compareTo={800}
              lessOrEqual={() => (
                <VStack gap={16}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    fullWidth
                  >
                    <TrackedTimeReportTitle />
                    <ManageProjectsNamesVisibility />
                  </HStack>
                  <BasedOnNumber
                    value={size.width}
                    compareTo={600}
                    more={() => (
                      <UniformColumnGrid gap={8} fullWidth>
                        <ReportFilters />
                      </UniformColumnGrid>
                    )}
                    lessOrEqual={() => (
                      <VStack gap={8}>
                        <ReportFilters />
                      </VStack>
                    )}
                  />
                </VStack>
              )}
              more={() => (
                <HStack alignItems="center" fullWidth gap={8}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    gap={20}
                    style={{ flex: 1 }}
                  >
                    <TrackedTimeReportTitle />
                    <FiltersRow>
                      <ReportFilters />
                    </FiltersRow>
                  </HStack>
                  <ManageProjectsNamesVisibility />
                </HStack>
              )}
            />
          )}
        </VStack>
      )}
    />
  )
}
