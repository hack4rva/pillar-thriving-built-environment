# Stakeholder and User Map: B4 Patch Management Tool

## Executive Summary
B4 has transitioned from a simple mailbox retriever to a comprehensive suite that standardizes the Linux kernel's email-based contribution model [1]. The tool serves two distinct masters: Maintainers (who need `b4 am` for patch application) and Contributors (who need `b4 send` for submission) [1]. B4 is critically dependent on the `lore.kernel.org` public-inbox archives for thread retrieval, making infrastructure stability a key priority for stakeholders. The project is anchored by the Linux Foundation and lead maintainer Konstantin Ryabitsev, providing high institutional trust [1]. 

## 1. Project Overview
B4 is a specialized command-line utility designed to streamline the distributed development workflow used by the Linux kernel and other projects relying on mailing lists for code submission and review [1]. It eliminates the manual drudgery of saving `.mbox` files and tracking patch revisions, acting as a helper utility to work with patches made available via public inbox archives [2] [3].

* **Official Documentation:** [https://b4.docs.kernel.org/](https://b4.docs.kernel.org/) [1]
* **Source Repository:** [https://github.com/mricon/b4](https://github.com/mricon/b4) [2]
* **Primary Communication:** tools@kernel.org [1]

## 2. Stakeholder Analysis
A stakeholder map is a visual representation of individuals or groups with a vested interest in a project, product, or idea [4]. For B4, this involves a high-stakes ecosystem where the Linux Foundation provides the platform, while subsystem maintainers dictate the workflow.

| Stakeholder Group | Role | Influence | Interest | Key Requirement |
| :--- | :--- | :--- | :--- | :--- |
| **Linux Foundation** | Host & Funding | High | High | Infrastructure stability and security (lore.kernel.org). |
| **Konstantin Ryabitsev** | Lead Maintainer | High | High | Project direction and codebase management. |
| **Subsystem Maintainers** | Primary Users (Inbound) | High | High | Clean patch application (`b4 am`) and automated trailer tracking [1]. |
| **Kernel Developers** | Primary Users (Outbound) | Medium | High | Simplified submission (`b4 send`) and feedback loops [1]. |
| **Lore.kernel.org Admins** | Infrastructure Support | Medium | Medium | Uptime and archive synchronization. |
| **CI/CD Bot Operators** | Downstream Users | Low | Medium | Programmatic access to patch series for automated testing. |

*Takeaway:* The most critical relationship is between the Subsystem Maintainers and the Kernel Developers, as B4 must seamlessly bridge the gap between patch submission and application.

## 3. User Personas

### 3.1 The Subsystem Maintainer
* **Goal:** Efficiently collect, test, and apply patch series from high-volume mailing lists.
* **Key Features Used:** 
 * `b4 am`: To retrieve and prepare a patch series for application [1].
 * `b4 shazam`: To apply patches directly to a local tree for quick testing [1].
 * `b4 ty`: To send automated "thank you" notes and status updates to contributors [1].

### 3.2 The Independent Contributor
* **Goal:** Submit high-quality patch series without struggling with mail client formatting or complex SMTP configurations.
* **Key Features Used:**
 * `b4 prep`: To manage local patch series and versioning (v1, v2, etc.) [1].
 * `b4 send`: To submit patches to the appropriate mailing lists via a web endpoint or SMTP [1]. For the Linux kernel, users can configure the `kernel.org` endpoint directly in their `~/.gitconfig` [5].
 * `b4 trailers`: To automatically collect "Reviewed-by" or "Acked-by" tags from the list [1].

## 4. Technical Dependencies
* **Public-Inbox (Lore):** B4 requires a `public-inbox` instance (typically `lore.kernel.org`) to search for and retrieve patch threads [3].
* **Git:** Deeply integrated with Git for branch management and patch application.
* **Python Environment:** The tool is written in Python. The recommended way to install b4 from PyPI is with `pipx`, which installs CLI tools into isolated environments using the command `pipx install b4` [6].

## 5. Roadmap & Future Stakeholders
* **TUI Reviewers:** With the introduction of the `b4 review` (alpha) feature, a new class of "Reviewer" stakeholders is emerging who require interactive, terminal-based interfaces for line-by-line feedback [1].
* **Enterprise Security Teams:** As supply chain security becomes paramount, stakeholders interested in `b4 kr` (working with contributor keys) are increasing to ensure cryptographic attestation of patches [1].

## References

1. *B4 end-user documentation — B4 end-user docs documentation*. https://b4.docs.kernel.org/
2. *mricon/b4: Tool to help with email-based patch workflows - GitHub*. https://github.com/mricon/b4
3. *Use b4 for kernel contributions | Marcus Folkesson Blog*. https://www.marcusfolkesson.se/blog/use-b4-for-kernel-contributions/
4. *The Complete Stakeholder Mapping Guide & Examples - Mural*. https://www.mural.co/blog/stakeholder-mapping
5. *sending in your work — B4 end-user docs documentation*. https://b4.docs.kernel.org/en/latest/contributor/send.html
6. *Installing b4 — B4 end-user docs documentation*. https://b4.docs.kernel.org/en/latest/installing.html