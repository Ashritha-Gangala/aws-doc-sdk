//snippet-sourceauthor: [soo-aws]

//snippet-sourcedescription:[Description]

//snippet-service:[AWSService]

//snippet-sourcetype:[full example]

//snippet-sourcedate:[N/A]

package com.example.workdocs;

import java.util.ArrayList;
import java.util.List;

import software.amazon.awssdk.services.workdocs.WorkDocsClient;
import software.amazon.awssdk.services.workdocs.model.DescribeUsersRequest;
import software.amazon.awssdk.services.workdocs.model.DescribeUsersResponse;
import software.amazon.awssdk.services.workdocs.model.User;

public class list_users {

	public static void main(String[] args) {
		// Based on WorkDocs dev guide code at http://docs.aws.amazon.com/workdocs/latest/developerguide/connect-workdocs-iam.html

		final String USAGE = "\n" +
	            "To run this example, supply your organization ID\n" +
	            "\n" +
	            "Ex: list_users <organizationId>\n";

        if (args.length < 1) {
            System.out.println(USAGE);
            System.exit(1);
        }
        
        String orgId = args[0];
	        
		// Use the default client. Look at Window, Preferences, AWS Toolkit to see the values
		WorkDocsClient workDocs = WorkDocsClient.create();

		List<User> wdUsers = new ArrayList<>();

		String marker = null;

		do {
			DescribeUsersResponse result;
			
			if(marker == null)
			{
				DescribeUsersRequest request = DescribeUsersRequest.builder()
						.organizationId(orgId)
						.build();
				result = workDocs.describeUsers(request);
			}
			else {
				DescribeUsersRequest request = DescribeUsersRequest.builder()
						.organizationId(orgId)
						.marker(marker)
						.build();
				result = workDocs.describeUsers(request);
			}

			System.out.println("List of users:");

			wdUsers.addAll(result.users());
			marker = result.marker();
		} while (marker != null);

		for (User wdUser : wdUsers) {
			System.out.printf("Firstname:%s | Lastname:%s | Email:%s | root-folder-id:%s\n",
					wdUser.givenName(), wdUser.surname(), wdUser.emailAddress(),
					wdUser.rootFolderId());
		}
	}
}
