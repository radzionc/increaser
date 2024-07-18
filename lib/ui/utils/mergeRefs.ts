import { isEmpty } from '@lib/utils/array/isEmpty'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'

export default function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.Ref<T> | React.RefCallback<T> {
  const definedRefs = withoutUndefined(refs)
  if (isEmpty(definedRefs)) {
    return null
  }

  return (targetRef) => {
    definedRefs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(targetRef)
      } else {
        const typedRef = ref as React.MutableRefObject<T | null>
        typedRef.current = targetRef
      }
    })
  }
}
