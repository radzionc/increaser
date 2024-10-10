After the user signed up in the app they will appear on the focus page. At this point they are most likely don't know anything about the app and how it works. We should prompt them to learn more about the "Focus" feature and how it can help them to improve their productivity. You should write a comprehensive guide, while keeping it short as we don't want to overwhelm the user with too much information, yet it should cover all the important aspects of focus at Increaser, and should be interesting enough to keep the user engaged. Return it as a an object implementing `ProductToolEducation` interface. Content should only use regular HTML tags without any styling as html tags styles will be set by a container component.

import { ReactNode } from 'react'

export type ProductToolEducation = {
title: string
subtitle: string
content: ReactNode
}
